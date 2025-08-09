/*
Métodos clave
useUser: Hook de ReactFire para obtener el usuario autenticado.
useFirestore: Hook de ReactFire para acceder a la instancia de Firestore.
collection: Obtiene una referencia a una colección específica en Firestore.
query: Crea una consulta para filtrar documentos.
where: Filtra documentos según un campo específico.
useFirestoreCollectionData: Hook de ReactFire para obtener datos de una colección de Firestore con soporte para suspense y bases de datos en tiempo real.
addDoc: Agrega un nuevo documento a una colección.
deleteDoc: Elimina un documento específico.
doc: Obtiene una referencia a un documento específico en Firestore.
updateDoc: Actualiza un documento existente.

*/

import type { Task } from "../schemas/task.schema";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  updateDoc,
  where,
} from "firebase/firestore"; //metodos de firestore para hacer el crud
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const useTaskActions = () => {
  const { data: user } = useUser();
  

  const db = useFirestore();
  const tasksRef = collection(db, "tasks");// hacer referencia a la coleccion tasks(tabla) de Sirebase

  const tasksQuery = query(
    tasksRef,
    where("userId", "==", user!.uid) // Filtra por el ID del usuario autenticado
  );

  const { status, data: tasks } = useFirestoreCollectionData(tasksQuery, {
    idField: "id", // 👈 Agrega el ID del documento a cada objeto
    suspense: true, // 👈 Habilita el modo suspense
  });

  // CREATE
  const createTask = async (taskData: {
    title: string;
    description?: string;
  }) => {
    const newTask = {
      ...taskData, // 👈 SPREAD OPERATOR
      completed: false, // Por defecto, una tarea nueva no está completada
      userId: user!.uid, // Asigna el ID del usuario autenticado
    };

    return await addDoc(tasksRef, newTask);//tasksRef=>referencia a la coleccion DB, newTask=> new task
  };

  // DELETE
  const deleteTask = async (id: string) => {
    const taskDoc = doc(db, "tasks", id);// doc unico docuemnto o registro
    return await deleteDoc(taskDoc); //deletedDoc es metodo de firebase para elimiarn un documento
  };

  // TOGGLE COMPLETED
  const toggleTaskCompleted = async (id: string) => {
    const task = tasks.find((task) => task.id === id);// tasks.find...busque en la tabla co coleccion

    //si no existe la tarea
    if (!task) {
      throw new Error("Task not found");
    }

    const taskDoc = doc(db, "tasks", id);
    return await updateDoc(taskDoc, {
      completed: !task.completed, // Cambia el estado de completado
    });
  };

  return {
    loading: status === "loading",
    error: status === "error",
    tasks: tasks as Task[],

    // Actions
    createTask,
    deleteTask,
    toggleTaskCompleted,
  };
};