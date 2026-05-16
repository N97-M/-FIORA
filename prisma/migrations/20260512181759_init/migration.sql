-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'EDITOR',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Hero" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "title_en" TEXT NOT NULL DEFAULT 'FIORA | Luxury Event Decor',
    "title_ar" TEXT NOT NULL DEFAULT 'فيورة | لتنسيق المناسبات',
    "tagline_en" TEXT NOT NULL DEFAULT 'LUXURY STARTS HERE',
    "tagline_ar" TEXT NOT NULL DEFAULT 'الفخامة تبدأ من هنا',
    "btn_gallery_en" TEXT NOT NULL DEFAULT 'View Gallery',
    "btn_gallery_ar" TEXT NOT NULL DEFAULT 'مشاهدة المعرض',
    "btn_contact_en" TEXT NOT NULL DEFAULT 'Contact Us',
    "btn_contact_ar" TEXT NOT NULL DEFAULT 'تواصل معنا',
    "image_url" TEXT NOT NULL DEFAULT '/hero-bg.jpg',
    "overlay_opacity" REAL NOT NULL DEFAULT 0.5,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Navbar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "logo_url" TEXT NOT NULL DEFAULT '/logo.png',
    "favicon_url" TEXT NOT NULL DEFAULT '/favicon.ico',
    "sticky_enabled" BOOLEAN NOT NULL DEFAULT true,
    "lang_switch_show" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "About" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "title_en" TEXT NOT NULL DEFAULT 'About FIORA',
    "title_ar" TEXT NOT NULL DEFAULT 'عن فيورة',
    "content_en" TEXT NOT NULL DEFAULT 'FIORA is a luxury event decor rental brand...',
    "content_ar" TEXT NOT NULL DEFAULT 'فيورة هي علامة تجارية فاخرة لتأجير ديكورات المناسبات...',
    "image_url" TEXT NOT NULL DEFAULT '/about-img.jpg',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Value" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text_en" TEXT NOT NULL,
    "text_ar" TEXT NOT NULL,
    "aboutId" INTEGER NOT NULL,
    CONSTRAINT "Value_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "About" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title_en" TEXT NOT NULL,
    "title_ar" TEXT NOT NULL,
    "desc_en" TEXT NOT NULL,
    "desc_ar" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'fas fa-star',
    "image_url" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name_en" TEXT NOT NULL,
    "name_ar" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "GalleryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title_en" TEXT NOT NULL,
    "title_ar" TEXT NOT NULL,
    "desc_en" TEXT NOT NULL,
    "desc_ar" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GalleryItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "whatsapp_number" TEXT NOT NULL DEFAULT '249123456789',
    "whatsapp_msg_en" TEXT NOT NULL DEFAULT 'Hello FIORA, I would like to inquire about...',
    "whatsapp_msg_ar" TEXT NOT NULL DEFAULT 'مرحباً فيورة، أود الاستفسار عن...',
    "phone_number" TEXT NOT NULL DEFAULT '249123456789',
    "tiktok_url" TEXT NOT NULL DEFAULT '#',
    "instagram_url" TEXT NOT NULL DEFAULT '#',
    "snapchat_url" TEXT NOT NULL DEFAULT '#',
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "primary_gold" TEXT NOT NULL DEFAULT '#DBC07E',
    "bg_dark" TEXT NOT NULL DEFAULT '#0a0a0a',
    "text_white" TEXT NOT NULL DEFAULT '#ffffff',
    "border_radius" TEXT NOT NULL DEFAULT '15px',
    "glass_opacity" REAL NOT NULL DEFAULT 0.1,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SEO" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "meta_title_en" TEXT NOT NULL DEFAULT 'FIORA | Luxury Event Decor',
    "meta_title_ar" TEXT NOT NULL DEFAULT 'فيورة | لتنسيق المناسبات',
    "meta_desc_en" TEXT NOT NULL DEFAULT 'Luxury event decor rentals in Sudan.',
    "meta_desc_ar" TEXT NOT NULL DEFAULT 'تأجير ديكورات المناسبات الفاخرة في السودان.',
    "og_image" TEXT,
    "keywords" TEXT NOT NULL DEFAULT 'luxury, event, decor, sudan, fiora',
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
