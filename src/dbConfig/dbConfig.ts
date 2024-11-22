import mongoose from 'mongoose';



export async function connect() {
    try {
        console.log(".env ",process.env.MONGODB_URI)
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        console.log("Connection: ", connection)
        connection.on("connected", () => {
            console.log("Connected to MongoDB");
        });

        connection.on("error", (err) => {
            console.log("Error connecting to MongoDB  " + err);
            process.exit(1);
        });

    } catch (error) {
        console.log(error, "ERROR CONNECTING TO DB");
    }
}

// export async function connect() {
//   try {
//     const mongoUrl = process.env.MONGODB_URL;
    
//     if (!mongoUrl) {
//       throw new Error("MONGODB_URL is not defined in the environment variables.");
//     }

//     await mongoose.connect(mongoUrl);
//     const connection = mongoose.connection;

//     connection.on("connected", () => {
//       console.log("MongoDB connected");
//     });
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// }


