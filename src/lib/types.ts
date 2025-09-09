// Файл: src/lib/types.ts

export interface Room {
  id: string;
  name: string;
  capacity: number;
  features: string[]; // e.g., ['projector', 'whiteboard']
}

export interface Asset {
  id: string;
  name: string;
  inventoryCode: string;
  status: 'available' | 'maintenance' | 'out-of-order'; // Пример статусов
}

export type ResourceType = 'room' | 'asset';

export interface Booking {
  id: string;
  resourceType: ResourceType;
  resourceId: string; // Будет ссылаться на id Room или Asset
  title: string;
  start: string; // Будем хранить как строку в формате ISO (UTC)
  end: string;   // Будем хранить как строку в формате ISO (UTC)
  notes: string;
}

// Этот интерфейс пригодится позже для всего набора данных
export interface AppData {
  rooms: Room[];
  assets: Asset[];
  bookings: Booking[];
}