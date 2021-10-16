import { Tag, Space } from 'antd'
import Link from 'next/link'

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: ({ href, text }) => <Link href={href}><a>{text}</a></Link>,
  },
{
  title: 'Tags',
    key: 'tags',
      dataIndex: 'tags',
        render: tags => (
          <>
            {tags.map(tag => {
              let color = 'green';
              return (
                <Tag color={color} key={tag}>
                  {tag}
                </Tag>
              );
            })}
          </>
        ),
  },
{
  title: 'Status',
    dataIndex: 'status',
      key: 'status',
        render: note => <span>{note}</span>,
  },
];

export const data = [
  {
    key: '1',
    name: { href: 'snake', text: '🐍 贪吃蛇' },
    tags: ['TS', '游戏'],
    status: '✅ 完成单人版基础功能'
  },
  {
    key: '2',
    name: { href: 'messageBoard', text: '💬 留言板' },
    tags: ['TS', '组件'],
    status: '✅ 完成基础功能'
  }
];