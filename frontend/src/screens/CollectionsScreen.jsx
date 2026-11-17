import React from 'react';
import collections from '../mockData/collections';
import './CollectionsScreen.css';

function CollectionsScreen() {
    return (
        <div className="collections">
            <h1 className="collections__title">Collections</h1>
            <p className="collections__subtitle">Curated groups to cook from, week to week.</p>

            <div className="collections__grid">
                {collections.map((collection) => (
                    <a key={collection.id} className="collections__card">
                        <div className="collections__card-photo" />
                        <div className="collections__card-body">
                            <div className="collections__card-name">{collection.name}</div>
                            <div className="collections__card-count">{collection.count} recipes</div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default CollectionsScreen;
