import StatsTableRow from "./StatsTableRow";

const UsersStatsTable = ({ users, ...props }) => {
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
        {users.map((user) => <StatsTableRow stats={user} key={user.nickname} />)}
      </tbody>
    </table>
  );
};

export default UsersStatsTable;
