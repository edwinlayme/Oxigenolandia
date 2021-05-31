import React from 'react'
import { useSelector } from 'react-redux';
import { ClienteEntry } from './ClienteEntry';

export const JournalEntries = () => {

    const { notes } = useSelector(state => state.notes);

    return (
        <div className="journal__entries">

            {
                notes.map(note => (
                    <ClienteEntry
                        key={note.id}
                        {...note}
                    />
                ))
            }

        </div>
    )
}
