const request = require('request-promise');


const urlBase = 'http://localhost:8000/api/';

const getLanes = async () => request({
  method: 'GET',
  uri: `${urlBase}/lanes`,
  json: true,
});

const getLane = async (laneId) => request({
  method: 'GET',
  url: `${urlBase}/lanes/${laneId}`,
  json: true,
});

const addLane = async name => {
  console.log(`Adding lane ${name}...`);
  return request({
    method: 'POST',
    url: `${urlBase}/lanes`,
    json: true,
    body: {
      name,
    },
  });
};

const addNote = async (task, laneId) => {
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

const updateNote = async (noteId, task) => {
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

// const updateLane = async (laneId, name) => {
//   console.log('Updating lane...');
//   return request({
//     method: 'PUT',
//     url: `${urlBase}/lanes/${laneId}`,
//     json: true,
//     body: {
//       name,
//     },
//   });
// };


const deleteLane = async laneId => {
  console.log('Lane deleted');
  return request({
    method: 'DELETE',
    url: `${urlBase}/lanes/${laneId}`,
    json: true,
  });
};

const updateLane = async (lane) => {
  console.log('Updating lane...');
  return request({
    method: 'PUT',
    // url: `${urlBase}/lanes/${lane.id}`,
    url: `${urlBase}/lanes/`,
    json: true,
    body: {
      ...lane,
    },
  });
};

const test = async () => {
  const laneToUpdate = {
    id: 'b9165da2-95c0-49e0-8245-b1b68fb75762',
    name: 'name changed',
  };

  const laneUpdated = await updateLane(laneToUpdate);
  console.log(laneUpdated);

  // const lane = await addLane('scriptLane');
  // const note = await addNote('scriptTask', lane.id);
  // console.log(lane);
  // console.log(note);
};

test();

// .then(lane => {
//   addNote('third task', lane.id);
  // .then(() => deleteLane(lane.id));
// });

// updateNote('165d70db-a69e-41eb-a088-751b301d369e', 'updated task again and again')
// .then(console.log('Done'))
// .catch(err => console.log(err));

// updateLane('176e6c43-f580-42d2-9f90-c266e7701f24', 'updated name again and again')
// .then(console.log('Done'))
// .catch(err => console.log(err));

// getLanes()
// .then(response => console.log(response.lanes))
// .catch(error => console.log(error));
