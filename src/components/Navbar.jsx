import React, { useState, useEffect } from 'react';
import { Search, Globe, Menu, User } from 'lucide-react';
import logo from './../assets/logo.png';

const Navbar = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0
  });

  useEffect(() => {
    fetch('/destinations.json')
      .then(response => response.json())
      .then(data => setDestinations(data));
  }, []);

  const handleGuestChange = (type, operation) => {
    setGuests(prev => ({
      ...prev,
      [type]: operation === 'increase' ? prev[type] + 1 : Math.max(0, prev[type] - 1)
    }));
  };

  const totalGuests = guests.adults + guests.children + guests.infants;

  const today = new Date().toISOString().split('T')[0];

  const handleDateClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* bnb Logo */}
          <div className="flex-shrink-0">
            <img className="h-8 w-auto" src={logo} alt="bnbIndia" />
          </div>
          <div className="flex-shrink-0">
              <h3>BnbIndia</h3>
          </div>
          {/* Search Bar */}
          <div className="flex-grow flex justify-center">
            <div className="flex items-center bg-white rounded-full border shadow-sm hover:shadow-md transition-shadow duration-200">
              {/* Destinations */}
              <div className="relative">
                <button 
                  className="px-4 py-2 text-sm text-left"
                  onClick={() => setIsDestinationOpen(!isDestinationOpen)}
                >
                  <div className="font-medium">Where</div>
                  <div className="text-gray-500">{selectedDestination || 'Search destinations'}</div>
                </button>
                {isDestinationOpen && (
                  <div className="absolute top-full left-0 w-64 mt-2 bg-white border rounded-lg shadow-lg z-10">
                    {destinations.map(dest => (
                      <button
                        key={dest.id}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setSelectedDestination(dest.name);
                          setIsDestinationOpen(false);
                        }}
                      >
                        {dest.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Vertical Divider */}
              <span className="border-r border-gray-300 h-8 mx-2"></span>

              {/* Check-in and Check-out Dates */}
              <div className="relative">
                <button 
                  className="flex items-center px-4 py-2 text-sm"
                  onClick={handleDateClick}
                >
                  <div className="mr-4">
                    <div className="font-medium">Check in</div>
                    <div className="text-gray-500">{checkIn || 'Add dates'}</div>
                  </div>
                  <div>
                    <div className="font-medium">Check out</div>
                    <div className="text-gray-500">{checkOut || 'Add dates'}</div>
                  </div>
                </button>
                {isDatePickerOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg z-10 p-4">
                    <div className="flex space-x-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check in</label>
                        <input
                          type="date"
                          value={checkIn}
                          min={today}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="border rounded p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check out</label>
                        <input
                          type="date"
                          value={checkOut}
                          min={checkIn || today}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="border rounded p-2"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Vertical Divider */}
              <span className="border-r border-gray-300 h-8 mx-2"></span>

              {/* Guests */}
              <div className="relative">
                <button 
                  className="px-4 py-2 text-sm text-left"
                  onClick={() => setIsGuestOpen(!isGuestOpen)}
                >
                  <div className="font-medium">Who</div>
                  <div className="text-gray-500">{totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : 'Add guests'}</div>
                </button>
                {isGuestOpen && (
                  <div className="absolute top-full right-0 w-64 mt-2 bg-white border rounded-lg shadow-lg z-10">
                    {['adults', 'children', 'infants'].map(type => (
                      <div key={type} className="flex justify-between items-center p-4 border-b">
                        <div>
                          <div className="font-medium capitalize">{type}</div>
                          <div className="text-sm text-gray-500">
                            {type === 'infants' ? 'Under 2' : type === 'children' ? '2-12' : 'Ages 13 or above'}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button 
                            className="w-8 h-8 rounded-full border flex items-center justify-center"
                            onClick={() => handleGuestChange(type, 'decrease')}
                          >
                            -
                          </button>
                          <span className="mx-2">{guests[type]}</span>
                          <button 
                            className="w-8 h-8 rounded-full border flex items-center justify-center"
                            onClick={() => handleGuestChange(type, 'increase')}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Button */}
              <button className="bg-red-500 text-white rounded-full p-2 m-2">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right Side Menu */}
          <div className="flex items-center">
           
            <button className="text-gray-700 hover:bg-gray-100 p-2 rounded-full ml-2">
              <Globe className="h-5 w-5" />
            </button>
            <button className="text-sm font-medium text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full">
              Host Panel
             </button>
            <div className="relative ml-2">
              <button 
                className="flex items-center space-x-2 border rounded-full p-2 hover:shadow-md transition-shadow duration-200"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <Menu className="h-5 w-5" />
                <User className="h-5 w-5" />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign up</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Log in</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Host your home</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Host an experience</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Help</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;