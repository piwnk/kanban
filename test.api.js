const request = require('request-promise');


const urlBase = 'http://localhost:8000/api/';

const getLanes = () => request({
  method: 'GET',
  uri: `${urlBase}/lanes`,
  json: true,
});

const getLane = (laneId) => request({
  method: 'GET',
  url: `${urlBase}/lanes/${laneId}`,
  json: true,
});

const addLane = name => {
  console.log(`${name} added`);
  return request({
    method: 'POST',
    url: `${urlBase}/lanes`,
    json: true,
    body: {
      name,
    },
  });
};

const addNote = (task, laneId) => {
  console.log(`${task} added to lane ${laneId}`);
  return request({
    method: 'POST',
    url: `${urlBase}/notes`,
    json: true,
    body: {
      note: {
        task,
      },
      laneId,
    },
  });
};

const updateNote = (noteId, task) => {
  console.log('Updating note...');
  return request({
    method: 'PUT',
    url: `${urlBase}/notes/${noteId}`,
    json: true,
    body: {
      task,
    },
  });
};


const deleteLane = laneId => {
  console.log('Lane deleted');
  return request({
    method: 'DELETE',
    url: `${urlBase}/lanes/${laneId}`,
    json: true,
  });
};

// addLane('first lane')
// .then(lane => {
  // addNote('first task', lane.id);s
  // .then(() => deleteLane(lane.id));
// });

updateNote('165d70db-a69e-41eb-a088-751b301d369e', 'updated task')
.then(console.log('Done'))
.catch(err => console.log(err));

// getLanes().then(response => console.log(response.lanes));
