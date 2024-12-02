import React, { useEffect, useState } from "react";
import Button from "./Button";
import Select from "./Select";
import TextField from "./TextField";
import TableForDocs from "./TableForDocs";

const SOURCE_URL_USERS = "http://localhost:5000/users";
const SOURCE_URL_DOCS = "http://localhost:5000/docs";

const MainPage = () => {
  const [docs, setDocs] = useState([]);

  //get data docs from bd
  const getDocs = async () => {
    const responseDocs = await fetch(SOURCE_URL_DOCS);
    const dataResponseDocs = await responseDocs?.json();

    setDocs(dataResponseDocs);
    return dataResponseDocs;
  };

  const [dataUsersAfterUpdate, setDataUsersAfterUpdate] = useState(null);

  useEffect(() => {
    getDocs();
  }, []);

  //for Select
  const initialOptions = ["Иванов И. И.", "Петров П. П.", "Сидоров С. С."];

  //get data users from bd
  const getDataUser = async () => {
    const response = await fetch(SOURCE_URL_USERS);
    const dataResponse = await response?.json();
    return dataResponse;
  };

  useEffect(() => {
    getDataUser();
  }, []);

  const [indexSelectedElem, setIndexSelectedElem] = useState(null);
  const [fio, setFio] = useState("ФИО конструктора");

  const handleChangeIndex = (index) => {
    setIndexSelectedElem(index);
    setFio(initialOptions[index]);
  };

  //for TextField
  const [selectedValue, setSelectedValue] = useState("");
  const handleChangeEvent = (event) => {
    setSelectedValue(event.target.value);
  };

  //handle click on button
  function handleClick() {
    console.log("handleClick button");
    try {
      getDataUser().then((resData) => {
        if (resData && indexSelectedElem) {
          const selectedFio = resData[indexSelectedElem].fio;
          const getDocument = (resData, selectedFio, selectedValue) => {
            return resData
              .find((userFio) => userFio.fio === selectedFio)
              ?.docsUser.find((document) => document === selectedValue);
          };
          const selectedDocument = getDocument(
            initialOptions,
            resData,
            selectedFio,
            selectedValue
          );

          if (selectedDocument) {
            console.log(
              "Вы уже отправляли заявку на этот документ, она уже была учтена"
            );
            return;
          }

          if (docs.includes(selectedValue)) {
            console.log("Найдено совпадение!!! Добавляем в docsUser");

            const URL_USER_UPDATE = `${SOURCE_URL_USERS}/${resData[indexSelectedElem].id}`;
            const updateUser = async () => {
              try {
                const responseUser = await fetch(URL_USER_UPDATE);
                const dataUserUpdate = await responseUser.json();

                if (dataUserUpdate.docsUser.includes(selectedValue)) {
                  console.log(
                    "Вы уже отправляли заявку на этот документ, она уже была учтена"
                  );
                  return;
                }

                dataUserUpdate.docsUser.push(selectedValue);

                const responseUserUpdate = await fetch(URL_USER_UPDATE, {
                  method: "PUT",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(dataUserUpdate),
                });

                if (responseUserUpdate.ok) {
                  console.log("Документ добавлен успешно!");
                } else {
                  console.error("Произошла ошибка при добавлении документа");
                }

                const resultDataUsersAfterUpdate = await fetch(
                  SOURCE_URL_USERS
                );
                const usersAfterUpdate =
                  await resultDataUsersAfterUpdate.json();
                setDataUsersAfterUpdate(usersAfterUpdate);
              } catch (err) {
                console.error(err);
              }
            };
            updateUser();
          } else {
            console.log("Такого документа нет");
          }
          return;
        }
        console.error("Документ, либо пользователь не выбраны");
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <header>
        <p>Отправить заявку на документ</p>
      </header>

      <body>
        <div>
          <Select
            options={initialOptions}
            variant="outlined"
            margin="normal"
            label={fio}
            placeholder={fio}
            onChange={handleChangeIndex}
          ></Select>
        </div>

        <div>
          <TextField
            label="Наименование документа"
            value={selectedValue}
            onChange={handleChangeEvent}
            margin="normal"
          ></TextField>
        </div>

        <div className="btn">
          <Button
            variant="contained"
            color="primary"
            margin="normal"
            onClick={handleClick}
          >
            Отправить заявку
          </Button>
        </div>

        <div>
          <TableForDocs currentData={dataUsersAfterUpdate}></TableForDocs>
        </div>
      </body>
    </div>
  );
};

export default MainPage;
