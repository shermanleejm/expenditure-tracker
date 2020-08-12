import React from 'react';
import { openDB } from "idb";

export async function initDB() {
    var idb = await openDB("main", 1);
    return idb
  }

export function insert(arr) {
    var idb = initDB();
    idb.put("expenditure", arr )
}