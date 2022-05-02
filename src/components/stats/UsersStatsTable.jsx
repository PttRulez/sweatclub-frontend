import StatsTableRow from "./StatsTableRow";

const UsersStatsTable = ({ usersStats, ...props }) => {
  const className = props.className ?? '';
  
  return (
    <table className={`table-fixed text-center ${className}`}>
      <thead className='bg-slate-300 rounded-2xl'>
        <tr>
          <th>Игра</th>
          <th>Сыграно</th>
          <th>Победы</th>
          <th>Винрейт</th>
        </tr>
      </thead>
      <tbody>
        {usersStats.map((stats, index) => <StatsTableRow stats={stats} key={stats.user.nickname} place={index+1}/>)}
      </tbody>
    </table>
  );
};

export default UsersStatsTable;
