const io = require('socket.io-client');

const socket = io('http://localhost:3000');

socket.on('connect', () => console.log('connected to server'));
socket.on('disconnect', () => console.log('disconnected from server'));

['start_countdown', 'exercise_started', 'exercise_finished'].forEach(event => {
  socket
    .on(event, (data) => {
      console.log(`${new Date()}: received event '${event}' with payload ${JSON.stringify(data)}`);
      if (event === 'start_countdown') {
        setTimeout(() => {
          socket.emit('cancel_exercise');
        }, 10000);
      }
    });
});
