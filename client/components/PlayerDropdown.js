import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import SearchableDropdown from "react-native-searchable-dropdown";

const PlayerDropdown = ({items,setPlayer}) => {
    const [selectedItem, setSelectedItem] = useState([]);
    const isFocused = useIsFocused()

    useEffect(()=>{
        setSelectedItem([]);
    },[isFocused]);

    return (
        <View>
            <SearchableDropdown
                multi={false}
        
                onItemSelect={(item) => {
                    setSelectedItem(item);
                    setPlayer(item);
                }}
                
                containerStyle={{ padding: 5 }}
        
                itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={items}
                defaultIndex={0}
                resetValue={false}
                textInputProps={
                {
                    placeholder: selectedItem?.name ? selectedItem?.name : 'Player Name',
                    underlineColorAndroid: "transparent",
                    style: {
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                    },
                }
                }
                listProps={
                {
                    nestedScrollEnabled: true,
                }
                }
            />
        </View>
    );
};

export default PlayerDropdown;
