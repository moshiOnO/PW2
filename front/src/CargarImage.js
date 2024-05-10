import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Axios from "axios";

function CargarImagen() {
    const [user, setUser] = useState('');
    const [archivo, setArchivo] = useState();
    const [allImg, setAllImg] = useState([]);
    const [base64Images, setBase64Images] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/getAllImg")
            .then((response) => {
                if (response.data === "No imagen") {
                    alert("No hay imágenes");
                } else {
                    setAllImg(response.data);
                    //console.log(response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching images:", error);
            });
    }, []);

    useEffect(() => {
        const convertImagesToBase64 = async () => {
            const base64Promises = allImg.map((val) => {
                const blob = new Blob([new Uint8Array(val.foto_usuario.data)], { type: 'image/jpeg' });
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                return new Promise((resolve) => {
                    reader.onloadend = () => {
                        resolve(reader.result.split(',')[1]);
                    };
                });
            });

            try {
                const base64Strings = await Promise.all(base64Promises);
                setBase64Images(base64Strings);
            } catch (error) {
                console.error("Error converting images to base64:", error);
            }
        };

        if (allImg.length > 0) {
            convertImagesToBase64();
        }
    }, [allImg]);

    const submit = (e) => {
        e.preventDefault();

        const frmData = new FormData();
        frmData.append("file", archivo);
        frmData.append("user", user);

        Axios.post("http://localhost:3001/file", frmData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((response) => {
            if (response.data.alert === "Success") {
                console.log(response.data);
            }
            if (response.data.alert === "Error") {
                alert("Error");
            }
        })
        .catch((error) => {
            console.error("Error submitting form:", error);
        });
    };

    return (
        <>
            <div>
                <label>Nombre de usuario</label>
                <input type="text" placeholder="Usuario"
                    value={user} onChange={(e) => { setUser(e.target.value) }} />

                <label>Archivo</label>
                <input type="file"
                    onChange={(e) => { setArchivo(e.target.files[0]) }} />

                <button className="btn btn-primary" onClick={submit}>Enviar</button>
            </div>

            {base64Images.map((base64String, index) => (
                <div key={index}>
                    <img src={`data:image/jpeg;base64,${base64String}`}
                        className="casr-img-top" style={{ width: '18rem' }} />
                    <h5 className="car-title">{allImg[index].nickname_usuario}</h5>
                </div>
            ))}
        </>
    );
}

export default CargarImagen;
