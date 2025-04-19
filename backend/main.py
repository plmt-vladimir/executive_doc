from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 👇 Импорт всех роутов
from modules.core.routers import construction, user, organization, sp, materials, igs_labtest, aosr, aook, transfer, project_registry
from modules.core.routers import auth_router

app = FastAPI(title="ExecutiveDoc")

# Разрешаем CORS (для фронта)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # временно на демо
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем роутеры
app.include_router(user.router)
app.include_router(construction.router)
app.include_router(organization.router)
app.include_router(sp.router)
app.include_router(materials.router)
app.include_router(igs_labtest.router)
app.include_router(aosr.router)
app.include_router(aook.router)
app.include_router(transfer.router)
app.include_router(project_registry.router)
app.include_router(auth_router.router)