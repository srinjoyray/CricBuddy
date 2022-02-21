import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { DataTable } from 'react-native-paper';
import { getBowlerStats } from '../../../actions';

const BowlerStatistics = ({id}) => {
  const [bowlerStats , setBowlerStats] = useState('');
  useEffect(async()=>{
    let data = await getBowlerStats({id});
    data.sort(function(a,b){
      return b.wickets-a.wickets;
    })
    setBowlerStats(data);
  })
  return (
    <DataTable>
        <DataTable.Header>
            <DataTable.Title style={{flex : 3}}>Name</DataTable.Title>
            <DataTable.Title style={{flex : 2}} numeric>Wickets</DataTable.Title>
            <DataTable.Title style={{flex : 2}} numeric>Overs</DataTable.Title>
            <DataTable.Title style={{flex : 2}} numeric>Runs</DataTable.Title>
            <DataTable.Title style={{flex : 2}} numeric>Avg</DataTable.Title>
            <DataTable.Title style={{flex : 2}} numeric>Econ</DataTable.Title>
        </DataTable.Header>
        <ScrollView>

        {
            bowlerStats && bowlerStats.length>0 ?
                bowlerStats?.map((bowler,index) =>{
                    return(
                        <DataTable.Row key={index}>
                            <DataTable.Cell style={{flex : 3}} >{bowler?.name}</DataTable.Cell>
                            <DataTable.Cell style={{flex : 2}} numeric>{bowler?.wickets}</DataTable.Cell>
                            <DataTable.Cell style={{flex : 2}} numeric>{Math.floor(bowler?.balls/6)}.{bowler?.balls%6}</DataTable.Cell>
                            <DataTable.Cell style={{flex : 2}} numeric>{bowler?.runs}</DataTable.Cell>
                            <DataTable.Cell style={{flex : 2}} numeric>{bowler?.avg.toFixed(2)}</DataTable.Cell>
                            <DataTable.Cell style={{flex : 2}} numeric>{bowler?.econ?.toFixed(2)}</DataTable.Cell>
                        </DataTable.Row>
                    )
                })
                :
                false
        }
        </ScrollView>

        
    </DataTable>
  )
}

export default BowlerStatistics