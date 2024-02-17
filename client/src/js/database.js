import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try{
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ content: content});
    const result = await request;
    console.log('Data Saved to Database', result);
  } catch (err) {
    console.log('error', err);
    throw err;
  }


// console.error('putDb not implemented');
}
// a method that gets all the content from the database
export const getDb = async () => {
  try{
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result.value;
  } catch (err) {
    console.log('error', err);
    throw err;
  }
  //console.error('getDb not implemented');
};
initdb();
