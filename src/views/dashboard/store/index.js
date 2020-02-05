import firebase from 'firebase';

// laad de berichten in die de gebruiker heeft gemaakt.
export const loadMessages = async userId => {
  let messageData = [];
  await firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('messages')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        messageData.push(doc);
      });
    })
    .catch(function(error) {
      console.log('Error getting documents: ', error);
    });
  return messageData;
};

// laad de berichten in die de user heeft gerepost.
export const loadReposts = async userId => {
  const messages = await firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('reposts')
    .get();

  messages
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        return doc.data();
      });
    })
    .catch(function(error) {
      console.log('Error getting documents: ', error);
    });
};
