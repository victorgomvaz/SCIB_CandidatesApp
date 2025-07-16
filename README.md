# SCIB Candidates App

Este proyecto es una aplicación web desarrollada en Angular y NestJS que permite gestionar una lista de candidatos. La interfaz de usuario permite introducir, visualizar y eliminar candidatos, mientras que el backend proporciona la API para gestionar la persistencia de los datos.

## Tecnologías utilizadas

- **Frontend:** Angular 16+, Angular Material
- **Backend:** NestJS
- **Testing:** Jest (unit y E2E), Cypress (E2E frontend)
- **Persistencia:** LocalStorage (frontend), almacenamiento en memoria (backend)

---

## Estructura del proyecto

```
SCIB_CandidatesApp/
├── frontend-scib/         # Aplicación Angular
│   └── src/app/
│       ├── components/
│       │   ├── candidate-form/       # Formulario de candidatos
│       │   └── candidate-table/      # Tabla con la lista de candidatos
│       └── services/
│           └── candidate.service.ts  # Servicio para gestionar candidatos
│   
└── backend-scib/          # API NestJS
    └── src/candidates/
        ├── candidates.controller.ts
        ├── candidates.service.ts
        └── dto/
```

---

## Instalación

### Frontend

```bash
cd frontend-scib
npm install
```

### Backend

```bash
cd backend-scib
npm install
```

---

## Ejecución de la aplicación

### 1. Ejecutar el backend

Por defecto se ejecuta en el puerto 3000:

```bash
cd backend-scib
npm run start:dev
```

### 2. Ejecutar el frontend

```bash
cd frontend-scib
ng serve
```

Accede desde: [http://localhost:4200](http://localhost:4200)

---

## Funcionamiento general

1. El formulario permite introducir un candidato (nombre, apellidos, experiencia, disponibilidad y seniority).
2. Los datos se guardan en el `localStorage` y se reflejan automáticamente en la tabla.
3. Simultáneamente, se realiza un envío `POST` al backend.
4. La tabla muestra todos los candidatos almacenados localmente.
5. Al recargar la página, los datos se recuperan desde `localStorage`.

---

## Testing

### Frontend

#### Test unitarios (Jest)

```bash
cd frontend-scib
npm run test
```

### Backend

#### Test unitarios

```bash
cd backend-scib
npm run test
```

#### Test end-to-end

```bash
npm run test:e2e
```

---

## Notas técnicas

- El servicio `CandidateService` utiliza `BehaviorSubject` para emitir y gestionar el estado de los candidatos.
- El `localStorage` se emplea como sistema de persistencia en el cliente.
- Los formularios están validados para evitar el envío de datos incompletos.

---

## Autor

**Víctor Gómez Vázquez**
