


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "hypopg" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "index_advisor" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."recipe_difficulty" AS ENUM (
    'Easy',
    'Medium',
    'Hard'
);


ALTER TYPE "public"."recipe_difficulty" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_modified_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_modified_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."recipes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "image_url" "text" NOT NULL,
    "prep_time" "text" NOT NULL,
    "cook_time" "text" NOT NULL,
    "tags" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "difficulty" "public"."recipe_difficulty" NOT NULL,
    "servings" integer NOT NULL,
    "is_favorite" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "video_url" "text",
    "nutrition" "jsonb",
    "ingredients" "jsonb",
    "steps" "jsonb"
);


ALTER TABLE "public"."recipes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."recipesDetail" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."recipesDetail" OWNER TO "postgres";


COMMENT ON TABLE "public"."recipesDetail" IS 'add more info to the recipe like ingredient, procedure, reference link';



ALTER TABLE ONLY "public"."recipes"
    ADD CONSTRAINT "recipes_pkey" PRIMARY KEY ("id");



CREATE OR REPLACE TRIGGER "update_recipes_modtime" BEFORE UPDATE ON "public"."recipes" FOR EACH ROW EXECUTE FUNCTION "public"."update_modified_column"();



ALTER TABLE ONLY "public"."recipesDetail"
    ADD CONSTRAINT "recipesDetail_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."recipes"("id") ON UPDATE CASCADE ON DELETE CASCADE;



CREATE POLICY "Enable delete for authenticated users only" ON "public"."recipes" FOR DELETE TO "authenticated" USING (true);



CREATE POLICY "Enable insert for authenticated users only" ON "public"."recipes" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable read access for all users" ON "public"."recipes" FOR SELECT USING (true);



CREATE POLICY "Enable update for anon users" ON "public"."recipes" FOR UPDATE TO "anon" USING (true) WITH CHECK (true);



CREATE POLICY "Enable update for authenticated users only" ON "public"."recipes" FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);



ALTER TABLE "public"."recipes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."recipesDetail" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";





























































































































































































GRANT ALL ON FUNCTION "public"."update_modified_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_modified_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_modified_column"() TO "service_role";
























GRANT ALL ON TABLE "public"."recipes" TO "anon";
GRANT ALL ON TABLE "public"."recipes" TO "authenticated";
GRANT ALL ON TABLE "public"."recipes" TO "service_role";



GRANT ALL ON TABLE "public"."recipesDetail" TO "anon";
GRANT ALL ON TABLE "public"."recipesDetail" TO "authenticated";
GRANT ALL ON TABLE "public"."recipesDetail" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































