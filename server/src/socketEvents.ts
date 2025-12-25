import { Server, Socket } from 'socket.io';

interface GameRoom {
    hostId: string;
    pin: string;
    quizTitle: string;
    players: { id: string, nickname: string }[];
    status: 'lobby' | 'playing' | 'results';
    currentQuestionIndex: number;
}

const rooms = new Map<string, GameRoom>();

export const setupSocketEvents = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('User connected:', socket.id);

        // Host creates a room
        socket.on('host-create-room', (data: { pin: string, quizTitle: string }) => {
            console.log(`Host creating room: ${data.pin}`);
            socket.join(data.pin);
            rooms.set(data.pin, {
                hostId: socket.id,
                pin: data.pin,
                quizTitle: data.quizTitle,
                players: [],
                status: 'lobby',
                currentQuestionIndex: 0
            });
        });

        // Player joins a room
        socket.on('player-join-room', (data: { pin: string, nickname: string }) => {
            const room = rooms.get(data.pin);
            if (room && room.status === 'lobby') {
                console.log(`Player ${data.nickname} joining room: ${data.pin}`);
                socket.join(data.pin);
                room.players.push({ id: socket.id, nickname: data.nickname });

                // Notify host and other players
                io.to(data.pin).emit('player-list-update', room.players.map(p => p.nickname));
                socket.emit('join-success', {
                    pin: room.pin,
                    quizTitle: room.quizTitle,
                    players: room.players.map(p => p.nickname)
                });
            } else {
                socket.emit('join-error', 'Room not found or game already started');
            }
        });

        // Host starts the game
        socket.on('start-game', (pin: string) => {
            const room = rooms.get(pin);
            if (room && room.hostId === socket.id) {
                room.status = 'playing';
                room.currentQuestionIndex = 0;
                console.log(`Game starting in room: ${pin}`);
                io.to(pin).emit('game-started');
            }
        });

        // Player submits an answer
        socket.on('submit-answer', (data: { pin: string, answerIndex: number }) => {
            const room = rooms.get(data.pin);
            if (room && room.status === 'playing') {
                console.log(`Player ${socket.id} submitted answer: ${data.answerIndex}`);
                // In a real app, we'd calculate points here and update room.players
                // For now, we just notify the host that an answer was received
                io.to(room.hostId).emit('answer-received', { playerId: socket.id, answerIndex: data.answerIndex });
            }
        });

        // Host moves to results
        socket.on('show-results', (pin: string) => {
            const room = rooms.get(pin);
            if (room && room.hostId === socket.id) {
                room.status = 'results';
                io.to(pin).emit('results-reveal');
            }
        });

        // Host moves to next question
        socket.on('next-question', (pin: string) => {
            const room = rooms.get(pin);
            if (room && room.hostId === socket.id) {
                room.currentQuestionIndex++;
                room.status = 'playing';
                io.to(pin).emit('next-question-start', { index: room.currentQuestionIndex });
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            // Handle cleanup of rooms/players if needed
        });
    });
};
