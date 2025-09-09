# Модель данных

Здесь описаны структуры данных для приложения Room&Assets.

## Room (Аудитория)
- `id: string` - уникальный идентификатор
- `name: string` - название аудитории
- `capacity: number` - вместимость
- `features: string[]` - массив особенностей (например, ["projector", "whiteboard"])

## Asset (Оборудование)
- `id: string` - уникальный идентификатор
- `name: string` - название оборудования
- `inventoryCode: string` - инвентарный номер
- `status: string` - статус (например, "available")

## Booking (Бронь)
- `id: string` - уникальный идентификатор
- `resourceType: "room" | "asset"` - тип ресурса
- `resourceId: string` - ID ресурса
- `title: string` - название брони
- `start: string` - начало (ISO строка в UTC)
- `end: string` - конец (ISO строка в UTC)
- `notes: string` - заметки

Пример данных лежит в файле `../seed/seed.example.json`.