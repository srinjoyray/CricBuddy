import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { getBatsmanStats, getBowlerStats } from '../../../actions';

const BatsmanStatistics = ({id}) => {
    const [batsmanStats , setBatsmanStats] = useState('');
    useEffect(async()=>{
        let data = await getBatsmanStats({id});
        data.sort(function(a,b){
            return b.runs-a.runs;
        })
        setBatsmanStats(data);

    },[]);
    // console.log(batsmanStats);
    return ( 
        <DataTable>
            <DataTable.Header>
                <DataTable.Title style={{flex : 3}}>Name</DataTable.Title>
                <DataTable.Title style={{flex : 1}} numeric>Runs</DataTable.Title>
                <DataTable.Title style={{flex : 2}} numeric>Innings</DataTable.Title>
                <DataTable.Title style={{flex : 1}} numeric>4</DataTable.Title>
                <DataTable.Title style={{flex : 1}} numeric>6</DataTable.Title>
                <DataTable.Title style={{flex : 2}} numeric>Avg</DataTable.Title>
                <DataTable.Title style={{flex : 2}} numeric>SR</DataTable.Title>
            </DataTable.Header>
            <ScrollView>

            {
                batsmanStats && batsmanStats.length>0 ?
                    batsmanStats?.map((batsman,index) =>{
                        return(
                            <DataTable.Row key={index}>
                                <DataTable.Cell style={{flex : 3}} >{batsman?.name}</DataTable.Cell>
                                <DataTable.Cell style={{flex : 1}} numeric>{batsman?.runs}</DataTable.Cell>
                                <DataTable.Cell style={{flex : 2}} numeric>{batsman?.innings}</DataTable.Cell>
                                <DataTable.Cell style={{flex : 1}} numeric>{batsman?.four}</DataTable.Cell>
                                <DataTable.Cell style={{flex : 1}} numeric>{batsman?.six}</DataTable.Cell>
                                <DataTable.Cell style={{flex : 2}} numeric>{batsman?.avg.toFixed(2)}</DataTable.Cell>
                                <DataTable.Cell style={{flex : 2}} numeric>{batsman?.sr?.toFixed(2)}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })
                    :
                    false
            }
            </ScrollView>

            
        </DataTable>
           
    );
};

export default BatsmanStatistics;
