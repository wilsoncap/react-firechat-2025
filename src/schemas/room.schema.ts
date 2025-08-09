import type { FieldValue, Timestamp } from "firebase/firestore";

export interface Room {
    id: string,
    participants: string[],
    createdAt: Timestamp | FieldValue
    lastMessage: LastMessage | null
}


export interface LastMessage {
    senderId: string,
    text: string,
    timestamp: Timestamp | FieldValue
}


export interface Messages {
    id: string
    text: string,
    senderId: string,
    timestamp: Timestamp | FieldValue 
}