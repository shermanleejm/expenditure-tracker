import React from "react";
import * as idb from 'idb';

export function initDB() {
  var db;
  let dbReq = indexedDB.open("main", 1);

  dbReq.onupgradeneeded = function (event) {
    db = event.target.result;
    let spending = db.createObjectStore("spending", { autoIncrement: true });
  };

  dbReq.onsuccess = function (event) {
    db = event.target.result;
  };

  dbReq.onerror = function (event) {
    console.log("error opening database " + event.target.errorCode);
    alert(
      "Sorry, this application requires some functionalities that are not supported by your browser. Please use a newer browser, thank you! "
    );
  };

  return db;
}

export function addSpending(value) {
  var db;
  let dbReq = indexedDB.open("main", 1);

  dbReq.onupgradeneeded = function (event) {
    db = event.target.result;
    let spending = db.createObjectStore("spending", { autoIncrement: true });
  };

  dbReq.onsuccess = function (event) {
    db = event.target.result;
    let tx = db.transaction(["spending"], "readwrite");
    let store = tx.objectStore("spending");
    store.add(value);
    tx.oncomplete = function () {
      console.log("stored spending!");
    };
    tx.onerror = function (event) {
      alert(
        "error occured trying to record your spending! Please try again later. " +
          event.target.errorCode
      );
    };
  };

  dbReq.onerror = function (event) {
    console.log("error opening database " + event.target.errorCode);
    alert(
      "Sorry, this application requires some functionalities that are not supported by your browser. Please use a newer browser, thank you! "
    );
  };
}

export function getSpending(value) {
  var db;
  let dbReq = indexedDB.open("main", 1);

  dbReq.onupgradeneeded = function (event) {
    db = event.target.result;
    let spending = db.createObjectStore("spending", { autoIncrement: true });
  };

  dbReq.onsuccess = function (event) {
    db = event.target.result;
    let tx = db.transaction(["spending"], "readonly");
    let store = tx.objectStore("spending");
    let getAllResult = store.getAll();
    getAllResult.onsuccess = function () {
      let spendingData = getAllResult.result;
    };
  };

  dbReq.onerror = function (event) {
    console.log("error opening database " + event.target.errorCode);
    alert(
      "Sorry, this application requires some functionalities that are not supported by your browser. Please use a newer browser, thank you! "
    );
  };
}
