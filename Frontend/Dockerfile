
FROM node:20 AS build

WORKDIR /app

# انسخ ملفات package.json لتثبيت المكتبات
COPY package*.json ./

RUN npm install

# انسخ باقي المشروع
COPY . .

# شغّل عملية البناء (للإنتاج)
RUN npm run build

# المرحلة الثانية: التشغيل
FROM nginx:alpine

# انسخ ملفات build إلى nginx
COPY --from=build /app/dist /usr/share/nginx/html

# افتحي المنفذ 80 لتشغيل الواجهة
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
