import StatsTableRow from "./StatsTableRow";

const UsersStatsTable = ({ usersStats, ...props }) => {
  const className = props.className ?? '';

  const tableHeaders = ['Сыграно', 'Победы', 'Винрейт' ]
  return (
    <table className={`table-fixed text-center ${className}`}>
      <thead className='bg-slate-300 rounded-2xl'>
      
        <tr>
          <th className='text-sm font-normal w-[40%]'></th>
          {tableHeaders.map((name) => (
            <th className='text-sm font-normal' key={name}>{name}</th>
          ))

          }
        </tr>
      </thead>
      <tbody>
        {usersStats.map((stats, index) => <StatsTableRow stats={stats} key={stats.user.nickname} place={index+1}/>)}
      </tbody>
    </table>
  );
};

export default UsersStatsTable;
