import React from 'react';
import ArticlePage from './ArticlePage';
import { useLocation } from 'react-router';

export default function IntroRouter() {
    const location = useLocation();

    return (
        <ArticlePage id={parseInt(new URLSearchParams(location.search).get("id"))}/>
    );
}