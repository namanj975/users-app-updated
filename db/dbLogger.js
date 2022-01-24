import mongoose from 'mongoose';
import colors from 'colors/safe';

var str = "naman";
console.log("string prototype",str.__proto__);
mongoose.set("debug", (collectionName, method, query, doc) => {
    console.log(colors.yellow.bold(`Mongoose logger ---${collectionName}.${method}`, JSON.stringify(query), doc ));
});

export default mongoose;