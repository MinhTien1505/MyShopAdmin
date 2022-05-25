const uploadFileToCloudinary = (file, folderName) => {
  return new Promise(function (resolve, reject) {
    //Ideally these to lines would be in a .env file
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/fresh-shop/upload";
    const CLOUDINARY_UPLOAD_PRESET = "ikwzpt3q";

    let formData = new FormData();
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", folderName);
    formData.append("file", file);

    let request = new XMLHttpRequest();
    request.open("POST", CLOUDINARY_URL, true);
    request.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    request.onreadystatechange = () => {
      // File uploaded successfully
      if (request.readyState === 4 && request.status === 200) {
        let response = JSON.parse(request.responseText);
        resolve(response);
      }

      // Not succesfull, let find our what happened
      if (request.status !== 200) {
        let response = JSON.parse(request.responseText);
        let error = response.error.message;
        alert("error, status code not 200 " + error);
        reject(error);
      }
    };

    request.onerror = (err) => {
      alert("error: " + err);
      reject(err);
    };

    request.send(formData);
  });
};

export default uploadFileToCloudinary;
