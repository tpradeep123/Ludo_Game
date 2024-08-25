import { View } from 'react-native'
import React, { useMemo } from 'react'
import Cell from './Cell'

const VerticlePath = React.memo(({ cells, color }) => {
  const groupCells = useMemo(() => {
    const groups = []

    for (let i = 0; i < cells.length; i += 3) {
      groups.push(cells.slice(i, i + 3))
    }
    return groups
  }, [cells])

  return (
    <View style={{ width: '20%', height: '100%', flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flexDirection: 'column', width: '100%', height: '100%' }}>
        {groupCells.map((group, groupIndex) => (
          <View
            key={`group=${groupIndex}`}
            style={{ flexDirection: 'row', width: '33.3%', height: '16.7%' }}
          >
            {group.map((id) => (
              <Cell key={`cell-${id}`} cell={true} id={id} color={color} />
            ))}
          </View>
        ))}
      </View>
    </View>
  )
})

export default VerticlePath
