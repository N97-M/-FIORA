const Database = require('better-sqlite3');
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

const sqliteDb = new Database('./dev.db', { readonly: true });
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function migrateData() {
  console.log('Starting migration to Supabase...');

  try {
    // 1. Users
    const users = sqliteDb.prepare('SELECT * FROM User').all();
    if (users.length > 0) {
      console.log(`Migrating ${users.length} users...`);
      for (const user of users) {
        // Convert dates
        user.createdAt = new Date(user.createdAt);
        user.updatedAt = new Date(user.updatedAt);
        // Supabase Boolean handling
        user.isActive = user.isActive === 1;
        await prisma.user.upsert({
          where: { id: user.id },
          update: user,
          create: user,
        });
      }
    }

    // 2. Hero
    const heroes = sqliteDb.prepare('SELECT * FROM Hero').all();
    if (heroes.length > 0) {
      console.log(`Migrating ${heroes.length} heroes...`);
      for (const hero of heroes) {
        hero.updatedAt = new Date(hero.updatedAt);
        await prisma.hero.upsert({
          where: { id: hero.id },
          update: hero,
          create: hero,
        });
      }
    }

    // 3. Navbar
    const navbars = sqliteDb.prepare('SELECT * FROM Navbar').all();
    if (navbars.length > 0) {
      console.log(`Migrating ${navbars.length} navbars...`);
      for (const nav of navbars) {
        nav.sticky_enabled = nav.sticky_enabled === 1;
        nav.lang_switch_show = nav.lang_switch_show === 1;
        nav.updatedAt = new Date(nav.updatedAt);
        await prisma.navbar.upsert({
          where: { id: nav.id },
          update: nav,
          create: nav,
        });
      }
    }

    // 4. About & Values
    const abouts = sqliteDb.prepare('SELECT * FROM About').all();
    if (abouts.length > 0) {
      console.log(`Migrating ${abouts.length} about sections...`);
      for (const about of abouts) {
        about.updatedAt = new Date(about.updatedAt);
        await prisma.about.upsert({
          where: { id: about.id },
          update: about,
          create: about,
        });
      }
    }

    const values = sqliteDb.prepare('SELECT * FROM Value').all();
    if (values.length > 0) {
      console.log(`Migrating ${values.length} values...`);
      for (const val of values) {
        await prisma.value.upsert({
          where: { id: val.id },
          update: val,
          create: val,
        });
      }
    }

    // 5. Services
    const services = sqliteDb.prepare('SELECT * FROM Service').all();
    if (services.length > 0) {
      console.log(`Migrating ${services.length} services...`);
      for (const svc of services) {
        svc.isVisible = svc.isVisible === 1;
        svc.updatedAt = new Date(svc.updatedAt);
        await prisma.service.upsert({
          where: { id: svc.id },
          update: svc,
          create: svc,
        });
      }
    }

    // 6. Categories
    const categories = sqliteDb.prepare('SELECT * FROM Category').all();
    if (categories.length > 0) {
      console.log(`Migrating ${categories.length} categories...`);
      for (const cat of categories) {
        await prisma.category.upsert({
          where: { id: cat.id },
          update: cat,
          create: cat,
        });
      }
    }

    // 7. GalleryItems
    const items = sqliteDb.prepare('SELECT * FROM GalleryItem').all();
    if (items.length > 0) {
      console.log(`Migrating ${items.length} gallery items...`);
      for (const item of items) {
        item.isFeatured = item.isFeatured === 1;
        item.isVisible = item.isVisible === 1;
        item.updatedAt = new Date(item.updatedAt);
        await prisma.galleryItem.upsert({
          where: { id: item.id },
          update: item,
          create: item,
        });
      }
    }

    // 8. Settings
    const settings = sqliteDb.prepare('SELECT * FROM Settings').all();
    if (settings.length > 0) {
      console.log(`Migrating ${settings.length} settings...`);
      for (const set of settings) {
        set.updatedAt = new Date(set.updatedAt);
        await prisma.settings.upsert({
          where: { id: set.id },
          update: set,
          create: set,
        });
      }
    }

    // 9. Theme
    const themes = sqliteDb.prepare('SELECT * FROM Theme').all();
    if (themes.length > 0) {
      console.log(`Migrating ${themes.length} themes...`);
      for (const thm of themes) {
        thm.updatedAt = new Date(thm.updatedAt);
        await prisma.theme.upsert({
          where: { id: thm.id },
          update: thm,
          create: thm,
        });
      }
    }

    // 10. SEO
    const seos = sqliteDb.prepare('SELECT * FROM SEO').all();
    if (seos.length > 0) {
      console.log(`Migrating ${seos.length} SEO records...`);
      for (const seo of seos) {
        seo.updatedAt = new Date(seo.updatedAt);
        await prisma.seo.upsert({
          where: { id: seo.id },
          update: seo,
          create: seo,
        });
      }
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    sqliteDb.close();
    await prisma.$disconnect();
  }
}

migrateData();
