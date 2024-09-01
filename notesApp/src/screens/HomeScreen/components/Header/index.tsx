import React from 'react';
import {Text, TouchableOpacity, ImageBackground, View} from 'react-native';
import {images} from '@assets';
import {Filter} from '@models';
import {Icon, Separator} from '@components';
import styles from './styles';

interface HeaderProps {
  onAddItem: () => void;
  filter: Filter | null;
  setFilter: (f: Filter) => void;
  unscyncedNotes: number;
}

const Header: React.ComponentType<HeaderProps> = ({
  onAddItem,
  filter,
  setFilter,
  unscyncedNotes,
}) => (
  <ImageBackground
    source={images.appbg}
    imageStyle={styles.image}
    style={styles.container}>
    <View style={styles.innerContainer}>
      <View style={styles.flexGrow}>
        <Text style={styles.label}>My Notes</Text>
        <View style={styles.filters}>
          <TouchableOpacity
            style={filter === Filter.ACTIVE && styles.underlined}
            onPress={() => {
              setFilter(Filter.ACTIVE);
            }}>
            <Text style={[styles.filterLabel]}>{Filter.ACTIVE}</Text>
          </TouchableOpacity>
          <Separator width={10} />
          <TouchableOpacity
            style={filter === Filter.DELETED && styles.underlined}
            onPress={() => {
              setFilter(Filter.DELETED);
            }}>
            <Text style={[styles.filterLabel]}>{Filter.DELETED}</Text>
          </TouchableOpacity>
          <Separator width={10} />
          <TouchableOpacity
            style={(filter === Filter.ALL || !filter) && styles.underlined}
            onPress={() => {
              setFilter(Filter.ALL);
            }}>
            <Text style={[styles.filterLabel]}>{Filter.ALL}</Text>
          </TouchableOpacity>
          <Separator width={10} />
          <View style={styles.row}>
            <TouchableOpacity
              style={filter === Filter.UNSYNCED && styles.underlined}
              onPress={() => {
                setFilter(Filter.UNSYNCED);
              }}>
              <Text style={[styles.filterLabel]}>{Filter.UNSYNCED}</Text>
            </TouchableOpacity>
            {unscyncedNotes > 0 && (
              <View>
                <View style={styles.unsyncedBadge}>
                  <Text style={styles.unsyncedText}>{unscyncedNotes}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
      <Separator width={10} />
      <TouchableOpacity style={styles.iconContainer} onPress={onAddItem}>
        <Icon name="add" size={30} />
      </TouchableOpacity>
    </View>
  </ImageBackground>
);

export default Header;
