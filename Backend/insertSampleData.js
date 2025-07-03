// insrets sample data into the database
// no need now 

const mongoose = require("mongoose");
const Medix = require("./models/medicine");

mongoose.connect("mongodb://127.0.0.1:27017/medweb");

const sampleMedicines = [
  {
    name: "Paracetamol",
    img1: "https://asset.cloudinary.com/djnhmh1wz/a0106ec224c9abc67af43f6cefee2a0c",
    img2: "https://asset.cloudinary.com/djnhmh1wz/a0106ec224c9abc67af43f6cefee2a0c",
    price: 50,
    description: ["Pain relief", "Fever reduction"],
    use: ["Headache", "Fever"],
    sideEff: ["Nausea", "Drowsiness"],
    safetyAd: ["Avoid alcohol", "Consult a doctor if pregnant"],
  },
  {
    name: "Ibuprofen",
    img1: "https://res.cloudinary.com/djnhmh1wz/image/upload/v1746290682/medix/apwvrntqcsovs6isffgm.jpg",
    img2: "https://res.cloudinary.com/djnhmh1wz/image/upload/v1746290688/medix/ygqgygvesopl2ahqpvi5.jpg",
    price: 100,
    description: ["Inflammation reduction", "Pain relief"],
    use: ["Arthritis", "Muscle pain"],
    sideEff: ["Stomach upset", "Dizziness"],
    safetyAd: ["Take with food", "Avoid if allergic to NSAIDs"],
  },
  {
    name: "Aspirin",
    img1: "https://res.cloudinary.com/djnhmh1wz/image/upload/v1746290691/medix/yi4ffgvkpchcmbjye3fl.jpg",
    img2: "https://res.cloudinary.com/djnhmh1wz/image/upload/v1746290692/medix/zensqz2gxl90srsfmril.jpg",
    price: 75,
    description: ["Blood thinner", "Pain relief"],
    use: ["Heart attack prevention", "Headache"],
    sideEff: ["Stomach upset", "Bleeding"],
    safetyAd: ["Avoid alcohol", "Consult a doctor if on blood thinners"],
  },
  {
    name: "Amoxicillin",
    img1: "https://res.cloudinary.com/djnhmh1wz/image/upload/v1746290695/medix/cf9hguwtvd60ch8vrnzt.jpg",
    img2: "https://res.cloudinary.com/djnhmh1wz/image/upload/v1746290696/medix/y2atb3kwop2hquvncy8r.jpg",
    price: 120,
    description: ["Antibiotic", "Bacterial infection treatment"],
    use: ["Ear infection", "Throat infection"],
    sideEff: ["Diarrhea", "Allergic reaction"],
    safetyAd: ["Complete the full course", "Consult a doctor if allergic to penicillin"],
  },
];

Medix.insertMany(sampleMedicines)
  .then(() => {
    console.log("Sample data inserted successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error inserting sample data:", err);
    mongoose.connection.close();
  });