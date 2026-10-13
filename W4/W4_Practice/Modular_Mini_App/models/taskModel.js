const tasks = [{ id: 1, title: 'Learn Express', done: false }];

export const getAll = () => tasks;

export const add = (task) => {
  const newTask = { id: tasks.length + 1, ...task };
  tasks.push(newTask);
  return newTask;
};
