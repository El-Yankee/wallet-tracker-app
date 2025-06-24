# 📆 Git Flow para WalletTracker

Este documento describe el flujo de trabajo con ramas para seguir desarrollando la app WalletTracker de forma ordenada y segura.

---

## ✅ Ramas principales

- `main`: contiene solo versiones estables (listas para generar APK y subir a GitHub).
- `develop`: rama de desarrollo activa. Aca se integran nuevas funcionalidades y fixes.

---

## 🌱 Ramas de trabajo

### Nuevas funcionalidades:
Usar ramas tipo:
```bash
feature/nombre-de-la-feature
```
Ejemplo:
```bash
git checkout -b feature/mejora-notas
```

### Correcciones de errores:
Usar ramas tipo:
```bash
fix/nombre-del-bug
```
Ejemplo:
```bash
git checkout -b fix/crash-en-lista-transacciones
```

---

## ✅ Flujo completo

1. Cambios nuevos:
    ```bash
    git checkout develop
    git checkout -b feature/mi-mejora
    # Hacer cambios
    git add .
    git commit -m "Describe tu mejora"
    git push -u origin feature/mi-mejora
    ```

2. Cuando terminás la mejora:
    ```bash
    git checkout develop
    git pull
    git merge feature/mi-mejora
    git push
    ```

3. Cuando `develop` esté estable y querés hacer un release:
    ```bash
    git checkout main
    git pull
    git merge develop
    git tag vX.Y.Z
    git push origin main --tags
    ```

4. Subí el APK generado a GitHub en la sección Releases usando el tag.

---

## 🚀 Tips

- Podés usar `git log --oneline --graph` para ver el histórico de ramas.
- Las ramas de `feature/` se pueden borrar una vez mergeadas.
- No hagas cambios directos sobre `main`.

---

🚀 Este flujo está pensado para crecer en equipo o individualmente con orden. Siempre que saques una nueva versión, podés volver a usar este mismo camino. ✨

