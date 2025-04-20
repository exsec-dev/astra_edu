import React from 'react';
import ChapterPage from './ChapterPage';
import { useLocation } from 'react-router';

export default function ChapterRouter() {
    const location = useLocation();
    const id = parseInt(new URLSearchParams(location.search).get("id"));
    const module = location.pathname.includes('commandline') ? 'command_line' : 'file_system';

    return (
        <ChapterPage id={id} module={module}/>
    );
}