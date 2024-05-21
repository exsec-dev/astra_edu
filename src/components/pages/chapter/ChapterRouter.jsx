import React from 'react';
import ChapterPage from './ChapterPage';
import { useLocation } from 'react-router';

export default function ChapterRouter() {
    const location = useLocation();

    return (
        <ChapterPage id={parseInt(new URLSearchParams(location.search).get("id"))}/>
    );
}