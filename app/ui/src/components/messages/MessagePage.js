import React, { useState, useEffect } from 'react';
import MessageSearchBar from './SearchBar';
import MessageDashBoard from './MessageDashboard'

export default function MessagePage() {

  return (
    <div>
      <h3>
        This is my messages.
      </h3>
      <MessageDashBoard />
    </div>
  );
    
}
