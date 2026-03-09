import { useState } from 'react';

import ResultsItem from './ResultsItem';
import { resources } from '../data/resources';
import Card from './ui/Card';

/* 
          selectedResource={selectedResource}
          onSelectResource={setSelectedResource}
          searchTerm={searchTerm}
          selectedCategories={selectedCategories}
          openNowOnly={openNowOnly}
*/

export default function Results({selectedResource,onSelectResource,searchTerm,selectedCategories,
  openNowOnly}) {

/* 
  {
    id: 'tutoring',
    title: 'Peer Tutoring Centre',
    category: 'Academic',
    summary: 'Drop-in tutoring and study support.',
    location: 'Building W, Room W101',
    openNow: true,
  },
*/

let filteredResources = resources;  
if (openNowOnly) {
    filteredResources = resources.filter((element) => element.openNow === openNowOnly);
}

if (selectedCategories && selectedCategories.length > 0) {
    filteredResources = filteredResources.filter((element) => 
      selectedCategories.includes(element.category)
    );
}
  return (
    <Card title="Results">
      <ul className="divide-y divide-gray-200">
        {filteredResources.map((r) => (
          <ResultsItem
            key={r.id}
            title={r.title}
            category={r.category}
            summary={r.summary}
            location={r.location}
            onClick={() => onSelectResource(r)}
            selected={selectedResource?.id === r.id}
          >
            {/* children: optional badge content */}
            {r.openNow && (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                Open now
              </span>
            )}
          </ResultsItem>
        ))}
      </ul>
    </Card >
  );
}