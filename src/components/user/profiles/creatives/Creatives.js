import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { fetchUsers } from '../../../../services/usersAPI';
import './Creatives.css';

const Creatives = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="creatives-container"> 
      <h1 className='title'>CREATIIVES</h1>
      <div className="users-grid"> 
        {users.map(user => (
          <Link key={user.ID} to={`/creatives/${user.ID}`}> {/* Wrap each card with Link */}
            <div className="user-card"> 
              <img src={user.Image} alt={user.Username} className="user-image" /> 
              <div className="user-details"> 
                <p>{user.Username}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Creatives;
