// import { useState } from 'react';
import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';

const users = [
  {
    userName: 'OscarArvl',
    name: 'Oscar Arevalo',
    isFollowing: true,
  },
  {
    userName: 'midudev',
    name: 'Miguel Duran',
    isFollowing: false,
  },
  {
    userName: 'elonmusk',
    name: 'Elon Musk',
    isFollowing: false,
  },
  {
    userName: 'pacohdezs',
    name: 'Paco Hernandez',
    isFollowing: false,
  },
];

function App() {
  // const [name, setName] = useState('OscarArvl');
  // console.log('render with name: ', name);
  return (
    <section className='App'>
      {users.map(({ userName, name, isFollowing }) => (
        <TwitterFollowCard
          key={userName}
          userName={userName}
          initialIsFollowing={isFollowing}
        >
          {name}
        </TwitterFollowCard>
      ))}
    </section>
  );
}

export default App;
