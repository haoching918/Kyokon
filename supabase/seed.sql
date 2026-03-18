-- Seed data mirrored from remote Supabase (aneqkpourlkflocbtgbg)
-- Generated: 2026-03-18

TRUNCATE TABLE public.recipes RESTART IDENTITY CASCADE;

INSERT INTO public.recipes (id, title, description, image_url, prep_time, cook_time, tags, difficulty, servings, is_favorite, created_at, updated_at, video_url, nutrition, ingredients, steps) VALUES

('8c0df14a-031d-4e8d-8cb4-74cfe3ff8354',
 'Spicy Thai Basil Chicken',
 'Authentic stir-fried spicy chicken dish with fresh Thai basil and crispy shallots.',
 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&h=400&fit=crop',
 '10 min', '15 min', ARRAY['ASIAN','SPICY'], 'Medium', 3, false,
 '2026-03-10 14:14:14.552582+00', '2026-03-10 14:14:14.552582+00',
 null, null, null, null),

('bc2ae239-2aec-464b-bdda-c726ea1d041d',
 'Berry Blast Smoothie Bowl',
 'Nutrient-packed smoothie bowl loaded with mixed berries, granola, chia seeds, and fresh mint.',
 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=400&fit=crop',
 '10 min', '0 min', ARRAY['VEGAN','HEALTHY'], 'Easy', 1, true,
 '2026-03-10 14:14:14.552582+00', '2026-03-10 14:14:14.552582+00',
 null, null, null, null),

('add317bd-bc66-4d0b-b6b4-5efb89459712',
 'Roasted Mediterranean Veggies',
 'Colorful oven-roasted vegetables seasoned to perfection with olive oil, rosemary, and sea salt.',
 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop',
 '15 min', '30 min', ARRAY['VEGETARIAN','MEDITERRANEAN'], 'Easy', 4, false,
 '2026-03-10 14:14:14.552582+00', '2026-03-10 14:14:14.552582+00',
 null, null, null, null),

('b26f1394-0df9-4897-be82-d18de7df7636',
 'Classic Beef Stew',
 'Hearty slow-cooked stew packed with fall-apart tender beef and garden-fresh vegetables.',
 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=600&h=400&fit=crop',
 '20 min', '2 hrs', ARRAY['COMFORT','SLOW-COOK'], 'Medium', 6, false,
 '2026-03-10 14:14:14.552582+00', '2026-03-10 14:14:14.552582+00',
 null, null, null, null),

('6b09bc5f-733f-4b4a-834e-0a926009e9c2',
 'Crispy Salmon Teriyaki',
 'Pan-seared salmon with a glossy homemade teriyaki glaze, served over steamed rice.',
 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop',
 '5 min', '12 min', ARRAY['SEAFOOD','JAPANESE'], 'Easy', 2, true,
 '2026-03-10 14:14:14.552582+00', '2026-03-10 14:14:14.552582+00',
 null, null, null, null),

('ea59fd71-35ad-490e-9618-fdf8da244035',
 'Mushroom Risotto',
 'Rich and creamy Italian risotto with wild mushrooms, parmesan, and fresh thyme.',
 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop',
 '10 min', '30 min', ARRAY['ITALIAN','VEGETARIAN'], 'Hard', 4, false,
 '2026-03-10 14:14:14.552582+00', '2026-03-10 14:14:14.552582+00',
 null, null, null, null),

('edd31cb7-d4b0-41b3-9b3d-6ce3544c558a',
 'Zesty Lemon Garlic Shrimp',
 'A quick 15-minute seafood delight bursting with zesty lemon and aromatic garlic butter.',
 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=600&h=400&fit=crop',
 '5 min', '10 min', ARRAY['SEAFOOD','RESTAURANT-Style'], 'Easy', 4, false,
 '2026-03-10 14:14:14.552582+00', '2026-03-16 15:16:39.021534+00',
 null, null,
 '[{"item":"Lemons","amount":"2 large"},{"item":"Garlic","amount":"4 cloves"},{"item":"Butter","amount":"4 tbsp"},{"item":"Large Shrimp","amount":"1 lb"},{"item":"Olive Oil","amount":"2 tbsp"},{"item":"Salt","amount":"1 tsp"},{"item":"Black Pepper","amount":"1/2 tsp"},{"item":"Linguine Pasta","amount":"12 oz"},{"item":"Fresh Parsley","amount":"1/4 cup"},{"item":"Red Pepper Flakes","amount":"1/4 tsp"},{"item":"White Wine (optional)","amount":"1/4 cup"},{"item":"Parmesan Cheese","amount":"1/4 cup"}]'::jsonb,
 null),

('c551f43f-7407-4c92-b68f-0b7aa4d48bf7',
 'Mango Coconut Curry',
 'Tropical-inspired curry with ripe mango, creamy coconut milk, and fragrant spices.',
 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=400&fit=crop',
 '10 min', '25 min', ARRAY['VEGAN','CURRY'], 'Medium', 4, true,
 '2026-03-10 14:14:14.552582+00', '2026-03-16 17:17:05.010787+00',
 null, null, null, null),

('4dbdf524-8e18-401d-b3cf-139278b9620b',
 'Avocado Pesto Pasta test',
 'Creamy, dairy-free pasta made with fresh avocado pesto and a hint of citrus.',
 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=400&fit=crop',
 '10 min', '15 min', ARRAY['VEGAN','PASTA'], 'Easy', 2, true,
 '2026-03-10 14:14:14.552582+00', '2026-03-16 15:16:44.937581+00',
 'https://youtu.be/CJ4mlyKhieE?si=xRViNJ_fCcfDVjJ9',
 '{"sodium":"350mg","protein":"12g","calories":450,"netCarbs":"45g","totalFat":"22g"}'::jsonb,
 '[{"item":"Pasta (penne or fusilli)","amount":"200g"},{"item":"Ripe avocado","amount":"1 large"},{"item":"Fresh basil leaves","amount":"1 cup"},{"item":"Pine nuts or walnuts","amount":"1/4 cup"},{"item":"Garlic","amount":"2 cloves"},{"item":"Olive oil","amount":"2 tbsp"},{"item":"Lemon juice","amount":"1 tbsp"},{"item":"Salt and black pepper","amount":"to taste"}]'::jsonb,
 '[{"title":"Boil Pasta","imageUrl":"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=400&fit=crop","description":"Cook the pasta according to package instructions in a large pot of boiling salted water until al dente. Reserve 1/4 cup of the pasta cooking water before draining."},{"title":"Prepare the Pesto","imageUrl":"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=400&fit=crop","description":"While the pasta is cooking, halve and pit the avocado. Scoop the flesh into a food processor or blender."},{"title":"Blend Ingredients","description":"Add the fresh basil, pine nuts, garlic, olive oil, and lemon juice to the food processor. Blend until you get a smooth, creamy pesto sauce."},{"title":"Combine Pasta and Sauce","description":"Return the drained pasta to the pot (off the heat). Add the avocado pesto and a splash of the reserved pasta water. Toss gently to coat the pasta evenly, adding more pasta water if the sauce needs thinning."},{"title":"Season and Serve","description":"Season with salt and freshly ground black pepper to taste. Serve immediately, as the color of avocado can darken over time."}]'::jsonb);
