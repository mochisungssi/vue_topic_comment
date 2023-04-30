<template>
    <div>
        <v-container>
            <v-col class="sm-6 md-5 lg-6">
                <v-card
                class="mx-auto"
                max-width="600"
                >
                    <!-- TAB -->
                    <v-tabs
                    v-model="tab"
                    color="deep-purple-accent-4"
                    align-tabs="center"
                    >
                        <!-- TAB ITEMS -->
                        <v-tab :value="1">Log In</v-tab>
                        <v-tab :value="2">Sign Up</v-tab>
                    </v-tabs>
                    <v-window v-model="tab">
                        <v-window-item
                            :value="1"
                        >
                            <v-container fluid>
                                
                            </v-container>
                        </v-window-item>

                        <v-window-item
                            :value="2"
                        >
                            <v-container fluid>
                                signup
                            </v-container>
                        </v-window-item>
                    </v-window>
                </v-card>
            </v-col>
        </v-container>
    </div>
</template>

<script>
export default {
    data: () => ({
        tab: null
    })
}
</script>