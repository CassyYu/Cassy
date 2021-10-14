import { Tag, Space } from 'antd'
import Link from 'next/link'

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <Link href="/snake"><a>{text}</a></Link>,
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
    title: 'Note',
    key: 'note',
    render: () => (
      <Space size="middle">
        <span>🛠 正在开发中...</span>
      </Space>
    ),
  },
];

export const data = [
  {
    key: '1',
    name: '贪吃蛇',
    tags: ['TS', '游戏'],
  }
];