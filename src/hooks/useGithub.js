import { useState, useEffect } from 'react';

const useGithub = userName => {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch(`https://api.github.com/users/${userName}`)
      .then(res => res.json())
      .then(setUser);
  }, [userName]);

  return user;
};

export default useGithub;
