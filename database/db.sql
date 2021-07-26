--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-07-26 16:31:11

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

--
-- TOC entry 3010 (class 1262 OID 33509)
-- Name: fantasy_stock_app; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE fantasy_stock_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';


ALTER DATABASE fantasy_stock_app OWNER TO postgres;

\connect fantasy_stock_app

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 200 (class 1259 OID 33510)
-- Name: user_stocks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_stocks (
    id integer NOT NULL,
    user_id integer NOT NULL,
    symbol character varying NOT NULL,
    company_name character varying NOT NULL,
    shares_owned integer,
    shares_value numeric,
    CONSTRAINT test_user_stocks_shares_owned_check CHECK ((shares_owned >= 0)),
    CONSTRAINT test_user_stocks_shares_value_check CHECK ((shares_value >= (0)::numeric))
);


ALTER TABLE public.user_stocks OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 33518)
-- Name: test_user_stocks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.test_user_stocks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.test_user_stocks_id_seq OWNER TO postgres;

--
-- TOC entry 3011 (class 0 OID 0)
-- Dependencies: 201
-- Name: test_user_stocks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.test_user_stocks_id_seq OWNED BY public.user_stocks.id;


--
-- TOC entry 202 (class 1259 OID 33520)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    username character varying NOT NULL,
    password character varying NOT NULL,
    wallet_balance numeric DEFAULT 25000,
    CONSTRAINT nonemptystr_password CHECK (((password)::text <> ''::text)),
    CONSTRAINT nonemptystr_username CHECK (((username)::text <> ''::text))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 33530)
-- Name: test_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.test_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.test_users_id_seq OWNER TO postgres;

--
-- TOC entry 3012 (class 0 OID 0)
-- Dependencies: 203
-- Name: test_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.test_users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2858 (class 2604 OID 33532)
-- Name: user_stocks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_stocks ALTER COLUMN id SET DEFAULT nextval('public.test_user_stocks_id_seq'::regclass);


--
-- TOC entry 2862 (class 2604 OID 33533)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.test_users_id_seq'::regclass);


--
-- TOC entry 2867 (class 2606 OID 33535)
-- Name: user_stocks test_user_stocks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_stocks
    ADD CONSTRAINT test_user_stocks_pkey PRIMARY KEY (id);


--
-- TOC entry 2869 (class 2606 OID 33537)
-- Name: user_stocks test_user_stocks_user_id_symbol_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_stocks
    ADD CONSTRAINT test_user_stocks_user_id_symbol_key UNIQUE (user_id, symbol);


--
-- TOC entry 2871 (class 2606 OID 33539)
-- Name: users test_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT test_users_pkey PRIMARY KEY (id);


--
-- TOC entry 2873 (class 2606 OID 33541)
-- Name: users test_users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT test_users_username_key UNIQUE (username);


--
-- TOC entry 2874 (class 2606 OID 33542)
-- Name: user_stocks test_user_stocks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_stocks
    ADD CONSTRAINT test_user_stocks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2021-07-26 16:31:12

--
-- PostgreSQL database dump complete
--

