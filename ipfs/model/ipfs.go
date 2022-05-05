package model

type Store struct {
	address string
}

func Connect(source string) (*Store, error) {

	store := &Store{
		address: source,
	}

	return store, nil
}
