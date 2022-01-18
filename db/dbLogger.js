import mongoose from 'mongoose';

mongoose.set("debug", (collectionName, method, query, doc) => {
    console.log(`Mongoose logger ---${collectionName}.${method}`, JSON.stringify(query), doc);
});

export default mongoose;